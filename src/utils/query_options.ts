type sort = "DESC"|"ASC"
class QueryOptions {
  page?: number;
  limit?: number;
  order?: number;
  search?: string;
  sort?: sort;
};

export default QueryOptions;