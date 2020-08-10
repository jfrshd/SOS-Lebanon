export class ArrayResponse<T> {
    public statusCode: number;
    public result: ApiResult<T[]>;

    constructor(obj: ArrayResponse<T> = {} as ArrayResponse<T>) {
        this.statusCode = obj.statusCode;
        this.result = obj.result ? new ApiResult(obj.result) : new ApiResult();
    }
}

export class ApiResponse<T> {
    public statusCode: number;
    public result: T;

    constructor(obj: ApiResponse<T> = {} as ApiResponse<T>) {
        this.statusCode = obj.statusCode;
        this.result = obj.result;
    }
}

export class ApiResult<T> {
    public Count: number;
    public Items: T;
    public ScannedCount: number;
    public LastEvaluatedKey: ApiEvaluatedKey;

    constructor(obj: ApiResult<T> = {} as ApiResult<T>) {
        this.Count = obj.Count;
        this.Items = obj.Items;
        this.ScannedCount = obj.ScannedCount;
        this.LastEvaluatedKey = obj.LastEvaluatedKey || new ApiEvaluatedKey();
    }
}

export class ApiEvaluatedKey {
    public id: string;
    public pk: string;

    constructor(obj: ApiEvaluatedKey = {} as ApiEvaluatedKey) {
        this.id = obj.id;
        this.pk = obj.pk;
    }
}
