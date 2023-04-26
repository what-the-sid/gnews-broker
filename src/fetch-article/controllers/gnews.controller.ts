import { Errors } from '@lib/log/interfaces';
import GnewsRepository from "../lib/repositories/gnews.repository"

class GnewsController {

  public async query(payload,fetchCache){
    try{

      const cacheMem = fetchCache.get(payload["apikey"]+"?"+"q="+payload["q"]);

      if(cacheMem){
        return cacheMem
      }

      const repository = new GnewsRepository()
      const response = await repository.getArticleswithQuery(payload)

      fetchCache.mset([
        {key: payload["apikey"]+"?"+"q="+payload["q"], val:response}
      ])

      return response

    }
    catch(error){
      console.log(error)
      return {
        error: true,
        errorCode: 500,
        details: "Internal Server Error",
        category: Errors.SERVER_ERROR,
      }
    }
  }
}

export default GnewsController;
