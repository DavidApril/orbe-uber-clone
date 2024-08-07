import {API_PREFIX, API_URL} from '@env';
import {orbeApi} from '../../config/api';
import {CreateRatingDTO} from '../../interfaces/rating.interface';
import {parseError} from '../../utils';

export class RatingService {
  static PREFIX: string = 'rating';

  static create = async (vote: CreateRatingDTO) => {
    try {
      const {data: response}: {data: any} = await orbeApi.post(
        `/rating/create`,

        {...vote},
      );

      console.log({response});
    } catch (error) {
      parseError(this.PREFIX + '/create', error);
    }
  };
}
