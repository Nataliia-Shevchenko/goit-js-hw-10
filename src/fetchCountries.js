export class RestCountriesApi {
  #BASE_URL = `https://restcountries.com/v3.1/`;

  query = null;

  fetchCountries() {
    const searchParams = new URLSearchParams({
      fields: `name,capital,population,flags,languages`,
    });

    return fetch(`${this.#BASE_URL}name/${this.query}?${searchParams}`).then(
      responce => {
        if (!responce.ok) {
          throw new Error(responce.status);
        }
        return responce.json();
      }
    );
  }
}
