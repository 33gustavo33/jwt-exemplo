const crypto = require("crypto")
let secret_key = "chave de encriptação"

let JSONbase64 = {
    encode: (json) => Buffer.from(JSON.stringify(json)).toString("base64url"),
    decode: (base64) => JSON.parse(Buffer.from(base64, "base64url").toString("ascii"))
}

function createToken(nome){
    return new Promise((resolve, reject) => {
        try {
            let header = JSONbase64.encode({typ: "JWT", "alg": "HS256"})
            let payload = JSONbase64.encode({nome: nome})
            let hash = crypto.createHmac("sha256", secret_key).update(`${header}.${payload}`).digest("base64url")
            let result_token = `${header}.${payload}.${hash}`

            resolve(result_token)
        } catch(err) {
            reject(err)
        }
    })
}

function validateToken(token){
    return new Promise((resolve, reject) => {
        try {
            let [header_in_base64, payload_in_base64, hash] = token.split(".")
            let valid_hash = crypto.createHmac("sha256", secret_key).update(`${header_in_base64}.${payload_in_base64}`).digest("base64url")

            resolve(hash == valid_hash)
        } catch(err) {
            reject(err)
        }
    })
}

module.exports = {
    generate: createToken,
    validate: validateToken
}