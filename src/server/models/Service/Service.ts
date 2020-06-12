// import moment from 'moment'
import * as yup from 'yup';
import Resource from '../Resource';
import pool from '../../db';
import findServiceSql from './findServiceSql';
import findServiceByIdSql from './findServiceByIdSql';
import insertServiceSql from './insertServiceSql';
import updateServiceByIdSql from './updateServiceByIdSql';
import ServiceType from '../../../types/Service';
import SongType from '../../../types/Song';
import Song from '../Song';
import NamedError from '../NamedError';

class Service extends Resource implements ServiceType {
  serviceId: number;

  date: Date;

  songs: SongType[];

  notes: string[];

  static schema = yup.object().shape({
    serviceId: yup.number().integer(),
    date: yup.date(),
    songs: yup.array().of(Song.schema),
    notes: yup.array().of(yup.string()),
  });

  static async find(input) {
    const v = yup
      .object()
      .shape({
        limit: yup.number(),
        from: yup.date(),
      })
      .validateSync(input);

    console.log('v', v);
    console.log('input', input);
    const { rows: services, rowCount } = await pool.query(findServiceSql);
    return { services: services.map((s) => new Service(s)), count: rowCount };
  }

  static async findById(serviceId) {
    const {
      rows: [service],
      rowCount,
    } = await pool.query(findServiceByIdSql, [serviceId]);
    return rowCount ? new Service(service) : null;
  }

  async delete() {
    return Service.deleteById(this.serviceId);
  }

  static async deleteById(serviceId) {
    const { rowCount } = await pool.query(
      `
        DELETE from services
        WHERE service_id = $1
      `,
      [serviceId]
    );
    return rowCount;
  }

  async put() {
    const { rowCount } = await pool.query(updateServiceByIdSql, [
      this.serviceId,
      this.notes,
      this.songs.map((s) => s.songId),
      this.date,
    ]);
    if (!rowCount) throw new NamedError('Server', 'Failed to update song');
    return this;
  }

  static async updateById(serviceId: number, values) {
    const service = await Service.findById(serviceId);
    if (!service) return null;
    const updates = Service.schema
      .shape({ serviceId: undefined })
      .validateSync(values, { stripUnknown: true });

    const { songs, missing } = await Song.findManyByTitleAndId(values.songs);

    if (missing)
      throw new NamedError('NotFound', 'Unable to find song(s)', missing);
    if (songs) updates.songs = songs as Song[];

    Object.keys(updates).forEach((key) => {
      service[key] = updates[key];
    });
    return service.save();
  }

  async insert() {
    this.validate();

    const { songs, missing } = await Song.findManyByTitleAndId(this.songs);
    if (missing)
      throw new NamedError('NotFound', 'Unable to find song(s)', missing);
    this.songs = songs;
    const {
      rows: [{ serviceId }],
    } = await pool.query(insertServiceSql, [
      this.date,
      this.notes,
      this.songs.map((s) => s.songId),
    ]);
    this.serviceId = serviceId;
    return this;
  }
}

export default Service;
