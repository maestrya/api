const SimiansFixture = {
    create: {
        empty: {},
        error: {
            "dna": [
                "ZZZZZZ",
                "MMMMMM",
                "HHHHHH",
                "BBBBBB"
            ]
        },
        invalid: {
            "dna": [
                "ZZZZZsflkçdkldkldkdlZ",
                "MMMMMM",
                "HHHHHH",
                "BBBBBB"
            ]
        },
        success: {
            "dna": [
                "ATGCGA",
                "CAGTGC",
                "TTATGT",
                "AGAAGG",
                "CCCCTA",
                "TKACTG"
            ]
        },
    }
}

module.exports = { SimiansFixture }