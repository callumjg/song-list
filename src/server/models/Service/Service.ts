// import moment from 'moment'
import * as yup from 'yup';
import Resource from '../Resource';
import pool from '../../db';
import findServiceSql from './findServiceSql';
import ServiceType from '../../../types/Service';
import SongType from '../../../types/Song';
import Song from '../Song';

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
    // TODO: Add options and validation
    // const v = Service.schema.validateSync(input);
    const { rows: services, rowCount } = await pool.query(findServiceSql);
    return { services: services.map((s) => new Service(s)), count: rowCount };
  }

  static async findById(serviceId) {
    const {
      rows: [service],
      rowCount,
    } = await pool.query(findByIdSql, [serviceId]);
    return rowCount ? new Service(service) : null;
  }

  async delete() {
    return Service.deleteById(this.serviceId);
  }

  static deleteById(id) {
    return 1;
  }

  static updateById(serviceId) {
    // const validated = req.body;
    // const song = await Song.findById(songId);
    // Object.keys(validated).forEach((key) => {
    //   song[key] = validated[key];
    // });
    // await song.save();
    return { newValues: {} as Service, count: 1 };
  }
}

export default Service;
