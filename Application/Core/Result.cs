namespace Application.Core
{
    public class Result<T>//T (type is activity)
    {
        public bool IsSuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }

        public static Result<T> Success(T value) => new Result<T> {IsSuccess = true, Value = value};//method to return activity if sucess
        public static Result<T> Failure(string error) => new Result<T> {IsSuccess = false, Error = error};//method to return error if failure
    }
}