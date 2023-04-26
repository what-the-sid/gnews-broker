import Joi from 'joi';
import { Errors } from '@lib/log/interfaces';
import { IDataInput, IDataResolved, IHandler, IErrorResponse, IPayloadBody } from './interfaces/handler.interface';

import GnewsController from './controllers/gnews.controller';


export class Handler implements IHandler{

  private schema: Joi.AnySchema<IDataInput>;

  public constructor() {
    this.schema = Joi.object({
      in: Joi.string().valid("title", "content","description"),
      q: Joi.string().required(),
      apikey: Joi.string().required()
    });
  }

  public async fetch(event: IDataInput,fetchCache): Promise<IDataResolved | IErrorResponse> {
    try{
      const validation: Joi.ValidationResult<IDataInput> = this.schema.validate(event);

      if (validation.error) {
        return {
          error: true,
          errorCode: 400,
          details: validation.error.message,
          category: Errors.INVALID_INPUT,
        };
      }

      const gnewsController = new GnewsController()

      const response = await gnewsController
                          .query(event,fetchCache) as unknown as IPayloadBody

      return {
        data:response,
        error:false
      };
    }
    catch(error){
      return {
        error: true,
        errorCode: 500,
        details: "Internal Server Error",
        category: Errors.SERVER_ERROR,
      }
    }

  }
}
