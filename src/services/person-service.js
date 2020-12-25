export default class PersonService {
  constructor(client = window.fetch.bind(window)) {
    this.client = client;
    this.apiBase = 'http://www.filltext.com';
    this.optionsBase = [
      'id={number|1000}',
      'firstName={firstName}',
      'lastName={lastName}',
      'email={email}',
      'phone={phone|(xxx)xxx-xx-xx}',
      'address={addressObject}',
      'description={lorem|32}',
    ];
  }

  async getResource(url) {
    const resource = `${this.apiBase}${url}`;
    const response = await fetch(resource, {
      timeout: 3000,
    });

    if (!response.ok) {
      throw new Error(
        `Could not fetch ${url}, received ${response.status}`,
      );
    }

    return response.json();
  }

  getSmallDataPieceOptionsString() {
    return [
      ...this.optionsBase,
      'rows=32', // must be 32
    ].join('&');
  }

  getLargeDataPieceOptionsString() {
    return [
      ...this.optionsBase,
      'rows=1000',
      'delay=3',
    ].join('&');
  }

  async getPeopleData(pieceSize = 'small') {
    const pieceMapping = {
      small: () => this.getSmallDataPieceOptionsString(),
      large: () => this.getLargeDataPieceOptionsString(),
    };

    const optionsString = pieceMapping[pieceSize]();
    const peopleData = await this
      .getResource(`/?${optionsString}`);

    return peopleData;
  }
}
