class Apifeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }
  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};
    // console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    //FIltering with category
    const querycopy = { ...this.querystr };
    console.log(querycopy);
    const removefield = ["limit", "page", "keyword"];
    removefield.forEach((key) => delete querycopy[key]);

    //Filtering of Price
    console.log(querycopy);
    let queryStr = JSON.stringify(querycopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));
    console.log(queryStr);
    return this;
  }
  pagination(resultPerPage) {
    const currentpage = this.querystr.page || 1;
    const skip = resultPerPage * (currentpage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = Apifeatures;
