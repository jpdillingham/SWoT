exports.getUserId = (req) => {
    return req.apiGateway.event.requestContext.authorizer.claims.sub;
}

exports.sortByEndTime = (predicate) => {
    return (a, b) => {
        a = a.endTime;
        b = b.endTime;
        
        if (predicate === 'asc') {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        }
        else { 
            if (a > b) return -1;
            if (a < b) return 1;
            return 0;
        }
    }
}