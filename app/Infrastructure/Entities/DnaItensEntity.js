
'use strict'

const lodash = use('lodash');

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
                const itemUpperCase = elem.toUpperCase();;
                if (simianScore.hasOwnProperty(itemUpperCase)) {
                    const actualCount = simianScore[itemUpperCase];
                    simianScore[itemUpperCase] = (actualCount < this.limit) ? (actualCount + 1) : actualCount;
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

    compare($data, $input) {
        let haveDifference = []
        const teste = lodash.groupBy($data, 'dna_id');
        const newteste = Object.keys(teste).map(item => {
            const sjkjlksd = teste[item].map(i => i.value);

            const assaakls = lodash.differenceWith($input, sjkjlksd, lodash.isEqual);
            if (!assaakls.length) {
                haveDifference.push(assaakls);
            }
        })
        return haveDifference;
    }
}

module.exports = { DnaItensEntity }