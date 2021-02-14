import { Movie, User, Trailer } from "../entity";

import { Db } from "../config";

export class movieModal {
  /** */
  static async addMovie({ id, file, title, description }: data): Promise<any> {
    // get state of a database
    const queryRunner = await Db.state();
    // start stransaction
    await queryRunner.startTransaction();
    try {
      //
      const fetcUser = await User.findOne({ where: { phone: id } });
      //
      const insMovie = new Movie({
        user: fetcUser,
        description,
        title,
      });
      await queryRunner.manager.save(insMovie);
      //
      const insTrailer = new Trailer({
        movie: insMovie,
        file,
      });
      await queryRunner.manager.save(insTrailer);

      // commit stransaction
      await queryRunner.commitTransaction();

      return Promise.resolve("Look fine.");
    } catch (error) {
      // undo changes
      await queryRunner.rollbackTransaction();
      // give feedback
      return Promise.reject({
        status: false,
        message: "Somethings went wrong, try again later.",
      });
    } finally {
      // release query runner
      await queryRunner.release();
    }
  }

  /** */
  static async getMovieBy({ id }): Promise<any> {
    try {
      const fetchResult = await User.findOne({
        where: { phone: id },
        relations: ["movie", "movie.trailer"],
      });

      return Promise.resolve(
        fetchResult["movie"].map((data) => {
          return {
            id: data["id"],
            title: data["title"],
            file: data["trailer"]["file"],
            description: data["description"],
          };
        })
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export interface data {
  id: string;
  file: string;
  title: string;
  description: string;
}
