type sort = "DESC"|"ASC"
class QueryOptions {
  page?: number;
  limit?: number;
  order?: number;
  goodness?: string;
  privacy?: string;
  postType?: string;
  periodId?: string;
  periodType?: string;
  isSave?: boolean | string;
  isActive?: boolean | string;
  sort?: sort;
};

export default QueryOptions;