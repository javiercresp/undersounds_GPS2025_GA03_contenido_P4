var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

var writeJson = exports.writeJson = function(response, arg1, arg2) {
  var code;
  var payload;

  if(arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  if(arg2 && Number.isInteger(arg2)) {
    code = arg2;
  }
  else {
    if(arg1 && Number.isInteger(arg1)) {
      code = arg1;
    }
  }
  if(code && arg1) {
    payload = arg1;
  }
  else if(arg1) {
    payload = arg1;
  }

  if(!code) {
    // if no response code given, we default to 200
    code = 200;
  }
  // If payload is an Error, create a readable JSON body and choose status
  if (payload instanceof Error) {
    // prefer explicit status property if set on the Error object
    const statusFromError = Number.isInteger(payload.status) ? payload.status : 500;
    code = statusFromError || code || 500;
    const errBody = { error: payload.message || String(payload), name: payload.name };
    try {
      payload = JSON.stringify(errBody, null, 2);
    } catch (e) {
      payload = JSON.stringify({ error: String(payload) });
    }
    // Log server-side for debugging
    try { console.error('[response error]', payload); } catch (e) {}
  } else if(typeof payload === 'object') {
    // If the payload contains an explicit status code, use it as HTTP status
    if (payload && Object.prototype.hasOwnProperty.call(payload, 'status') && Number.isInteger(payload.status)) {
      // prefer explicit code from payload
      code = payload.status;
      try {
        // clone and remove status from body so it isn't duplicated
        const bodyCopy = Object.assign({}, payload);
        delete bodyCopy.status;
        payload = JSON.stringify(bodyCopy, null, 2);
      } catch (e) {
        payload = JSON.stringify(payload, null, 2);
      }
    } else {
      payload = JSON.stringify(payload, null, 2);
    }
  }
  response.writeHead(code, {'Content-Type': 'application/json'});
  response.end(payload);
}
