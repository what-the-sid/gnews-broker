import fetchWithTimeout from '@lib/utils/fetch-with-timeout';
import HttpResponse from '@lib/http/response';
import { IErrorResponse, IPayloadBody } from '../../interfaces/handler.interface';
import { Errors } from '@lib/log/interfaces';


class GnewsRepository {

  private gnewsUrl: string;
  private timeout: string;

  public constructor() {
    this.gnewsUrl = process.env.GNEWS_BASE_URL;
    this.timeout = process.env.TIMEOUT || '7000';
  }

  public async getArticleswithQuery(data) {
    try{
      const queryParams = (json) =>{
        return '?' +
        Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
      }
      const queryUrl = `${this.gnewsUrl}${queryParams(data)}`;

      const headers = {
        'Content-Type': 'application/json'
      };

      const clientResponse = await fetchWithTimeout(
        queryUrl,
        {
          method: 'GET',
          headers
        },
        parseInt(this.timeout)
      );
      const httpResponse = new HttpResponse<IPayloadBody, IErrorResponse>();
      const response = (await httpResponse.processResponse(clientResponse)) as unknown as IPayloadBody;
      return response

    }
    catch(err){
      console.log(err)
      return {
        error: true,
        errorCode: 500,
        details: "Internal Server Error",
        category: Errors.SERVER_ERROR,
      }
    }


  }

}

export default GnewsRepository
