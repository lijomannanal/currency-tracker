import api from '../api';
import { mockLiveCurrencyData } from "../../utils/test/mockData";

describe('api service', () => {
    let fetchSpy;
    beforeEach(() => {
        fetchSpy = jest.spyOn(global, 'fetch');
      });
      
      afterEach(() => {
      //  jest.restoreAllMocks();
      });


    it('should invoke fetch api with correct url and default headers', async () => {
         fetchSpy.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockLiveCurrencyData),
            ok: true
          });
         const response = await api.get("/testurl");
         expect(fetchSpy).toHaveBeenCalledTimes(1);
         expect(fetchSpy).toHaveBeenCalledWith('https://api.apilayer.com/currency_data/testurl', {"headers": {"map": {"apikey": "oes6DBBkSeeZVdOju72vFJkxqgfjwXj5"}}});
         expect(response).toEqual(mockLiveCurrencyData);
         fetchSpy.mockRestore();
    });

    it('should handle error if the api response is not ok', async () => {
        fetchSpy.mockImplementation(() => ({
           json: jest.fn().mockImplementation(() => { 
                return  new Promise((resolve, reject) => {
                   resolve({ message: 'api test error'});
                });
             }),
           ok: false
         }));
       await expect(api.get("/testurl")).rejects.toThrowError('api test error');
   });

})

