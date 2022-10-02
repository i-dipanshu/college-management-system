export default (handleAsyncError) => (req, res, next) => {
    Promise.resolve(handleAsyncError(req, res, next)).catch(next);
}