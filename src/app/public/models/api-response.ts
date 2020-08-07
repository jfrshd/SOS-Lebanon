export class ApiResponse<T> {
    public statusCode: number;
    public result: ApiResult<T>;

    constructor(obj: ApiResponse<T> = {} as ApiResponse<T>) {
        this.statusCode = obj.statusCode;
        this.result = new ApiResult(obj.result);
    }
}

export class ApiResult<T> {
    public Count: number;
    public Items: T[];
    public ScannedCount: number;

    constructor(obj: ApiResult<T> = {} as ApiResult<T>) {
        this.Count = obj.Count;
        this.Items = obj.Items || [];
        this.ScannedCount = obj.ScannedCount;
    }
}

