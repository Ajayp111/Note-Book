// Check if the request is coming from the my client/frontend server

const checkUserAgent = (userAgent) => {
    // console.log(userAgent);
    const regex = /^mozilla\/5.0/i;
    let isMatch = regex.test(userAgent);
    return isMatch;
}

const allowApiRequest = (origin, referer, userAgent) => {
    return process.env.CLIENT_ORIGIN === origin && referer !== undefined && checkUserAgent(userAgent);
}

const validateApi = (req, res, next) => {
    // console.log(req.get('host'));
    // console.log(req.path);

    let origin = req.get('origin');
    let referer = req.get('referer');
    let userAgent = req.get('user-agent');

    const apiToken = req.header('api-token');
    // console.log("apiToken: " + apiToken);
    if (!apiToken) {
        return res.status(401).send({ error: "Forbidden, Unauthorized Access." });
    }
    try {
        if (apiToken === process.env.api_token && allowApiRequest(origin, referer, userAgent)) {
            next();
        } else {
            return res.status(401).send({ error: "Unauthorized Access, You're not authorized to make this api request." });
        }
    } catch (error) {
        return res.status(401).send({ error: "Some Error occured." });
    }

}

module.exports = validateApi;