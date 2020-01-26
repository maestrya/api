
'use strict'

class DnaItensEntity {
    constructor() {
        this.limit = 4;
    }

    checkSequence(object) {
        return Object.keys(object).filter(elem => object[elem] == this.limit);
    }

    verifyIsSimian(dnas) {
        const simianScore = { A: 0, T: 0, C: 0, G: 0 }
        const resultIsSimian = [];

        for (let dna in dnas) {
            let is_simian = false;
            const value = dnas[dna];
            const arrayValues = value.split('');
            arrayValues.some(elem => {
                if (simianScore.hasOwnProperty(elem)) {
                    const actualCount = simianScore[elem];
                    simianScore[elem] = (actualCount < this.limit) ? (actualCount + 1) : actualCount;
                    is_simian = true;
                }
            });
            resultIsSimian.push({ value, is_simian })
        }

        const resultCheckSequence = this.checkSequence(simianScore);

        return { isSimian: (resultCheckSequence.length != 0), resultIsSimian }
    }

    handleCreate(dna_id, itens) {
        let newItens = [];
        for (let item in itens) {
            const actual = Object.assign(itens[item], { dna_id });
            newItens.push(actual)
        }
        return newItens;
    }
}

module.exports = { DnaItensEntity }