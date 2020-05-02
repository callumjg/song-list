import Resource from '../Resource';

class Service extends Resource {
  serviceId: number;
  static findById(id) {
    return {} as Service;
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
