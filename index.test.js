const token = require("./index.js")

describe("testar Token", () => {
    test("Criar token", async () => {
        let tokenGenerated = await token.generate("João")
        expect(tokenGenerated).toBe("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJub21lIjoiSm_Do28ifQ.uKaTrvtyrVWzJv_HOFCK-dOAScofw97kH2E6VQnKvLg")
    })

    test("Validar token real", async () => {
        let validToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJub21lIjoiSm_Do28ifQ.uKaTrvtyrVWzJv_HOFCK-dOAScofw97kH2E6VQnKvLg"
        let isValid = await token.validate(validToken)
        expect(isValid).toBe(true)
    })

    test("Validar token falso", async () => {
        let invalidToken = "eyJ2IjmiMC44IiwiYWxaIjoic2hhMjU2In0.ejajIjoxMjMdInIbiOjIzMX0.4wzO-tAHLoqN8z9Pl7bo-SjQrPqto6Lebi7njC35C4U"
        let isValid = await token.validate(invalidToken)
        expect(isValid).toBe(false)
    })
})