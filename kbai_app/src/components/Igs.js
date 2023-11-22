const Igs = (likedMovies, hatedMovies) => {
    // indices with single labels
        // 2: runtime
        // 4: rating
        // 6: release date
        
    var idxLabels = [2, 4, 6];

    // indices with multiple options / labels
        // 9: multiple genres
        // 11: tags
        // 12: found nouns
    var idxWords = [9, 11, 12]

    var options = {};
    options[2] = {};
    options[4] = {};
    options[6] = {};
    options[9] = {};
    options[11] = {};
    options[12] = {};

    // Iterate through all possible examples and collect all possible features
    for(let i = 0; i < likedMovies.length; i++){
        let movie = likedMovies[i];

        for(let j = 0; j < idxLabels.length; j++){
            let featureIdx = idxLabels[j];
            let feature = movie[featureIdx];
            
            if(!(feature in options[featureIdx])){
                options[featureIdx][feature] = [movie];
            } else {
                if(!options[featureIdx][feature].includes(movie)){
                    options[featureIdx][feature].push(movie);
                }
            }
        }

        for(let j = 0; j < idxWords.length; j++){
            let featureIdx = idxWords[j];
            let feature = movie[featureIdx];

            for(let k = 0; k < feature.length; k++){
                let word = feature[k].toLowerCase();

                if(!(word in options[featureIdx])){
                    options[featureIdx][word] = [movie];
                } else {
                    if(!options[featureIdx][word].includes(movie)){
                        options[featureIdx][word].push(movie);
                    }
                }
            }
        }
    }

    var idxImp = idxLabels.concat(idxWords);

    let hypothesisLst = [];

    // iterate through all possible features and try to create a hypothesis
    for (let [featIdx, feats] of Object.entries(options)) {
        for (let [feat, exampleLst] of Object.entries(feats)) {
            // start with possible feature's first example
            let hypothesis = [...exampleLst[0]];

            // iterate through rest of examples and their features
            for(let i = 1; i < exampleLst.length; i++){
                let example = exampleLst[i];
                
                // if first example and example disagree, remove that feature from hypothesis
                for(let j = 0; j < idxImp.length; j++){
                    if(hypothesis[idxImp[j]] === -1){
                        continue;
                    }
                    let exampleFeat = example[idxImp[j]];

                    let check = false;

                    // For the multilabelled stuff, just check if there's intersection
                    if(idxImp[j] > 6){
                        check = hypothesis[idxImp[j]].some(item => exampleFeat.includes(item)) 
                    } else {
                        check = exampleFeat != hypothesis[idxImp[j]];
                    }

                    if(check){
                        hypothesis[idxImp[j]] = -1; // set it to -1 if disagree
                    }

                    if(idxImp[j] > 6 && !check){
                        // concat
                        hypothesis[idxImp[j]] = [...new Set([...hypothesis[idxImp[j]], ...exampleFeat])]
                    }
                }

            }

            // if everything isn't -1, then add hypothesis to list of hypothesis
                // hypothetically, at least the feature you started with shouldn't be -1
            if(!hypothesis.every(item => item === -1)){
                hypothesisLst.push(hypothesis);
            }
        }
    }

    console.log(hypothesisLst.length);
    hypothesisLst = cullHypothesis(hypothesisLst);
    console.log(hypothesisLst.length);

    // now we actually perform IGS

    for(let i = 0; i < hatedMovies.length; i++){
        let hatedMovie = hatedMovies[i];

        let j = 0;
        while(j < hypothesisLst.length){
            let hypo = hypothesisLst[j];

            var result = checkHypo(hatedMovie, hypo);

            if(result === 1){
                // Remove current hypothesis and make it more specific by adding a random feature with a random value
                
                // Pick a random feature. Start by getting list of features you're allowed to add.
                var allowedFeat = [];

                for(let k = 0; k < idxImp.length; k++){
                    let feat = hypo[idxImp[k]];

                    if(feat === -1){
                        allowedFeat.push(idxImp[k]);
                    }
                }

                if(allowedFeat.length !== 0){
                    let rngIdx = Math.floor(Math.random() * allowedFeat.length);

                    let rngFeat = allowedFeat[rngIdx];

                    let optLst = Object.keys(options[rngFeat]);

                    rngIdx = Math.floor(Math.random() * optLst.length);

                    let newHypothesis = [...hypo];
                    newHypothesis[rngFeat] = optLst[rngIdx];
                    hypothesisLst.push(newHypothesis);
                }
                hypothesisLst.splice(j, 1);
                continue;
                
            }
            j += 1;
        }
    }
    console.log("WE MADE IT!")
    console.log(hypothesisLst);
}

const cullHypothesis = (hypothesisLst) => {
    // kills duplicate hypothesis, but not more general ones
    var idxLabels = [2, 4, 6];
    var idxWords = [9, 11, 12]
    var idxImp = idxLabels.concat(idxWords);

    let i = 0;

    while(i < hypothesisLst.length){
        let iIncrement = true;
        let hypo = hypothesisLst[i];
        
        let j = 0;
        while(j < hypothesisLst.length){
            let hypo2 = hypothesisLst[j];

            if(i === j){
                j += 1;
                continue;
            }

            let same = 0;
            let deadTraits = 0;

            for(let k = 0; k < idxImp.length; k++){
                if(hypo[idxImp[k]] === -1){
                    deadTraits += 1;
                    continue;
                } else if(hypo2[idxImp[k]] == -1){
                    continue;
                }

                let check = false;

                if(idxImp[k] > 6){
                    check = hypo[idxImp[k]].some(item => hypo2[idxImp[k]].includes(item))
                } else {
                    check = hypo[idxImp[k]] === hypo2[idxImp[k]]
                }

                if(check){
                    same += 1;
                }
            }

            if(same >= idxImp.length - deadTraits){
                hypothesisLst.splice(i, 1);
                iIncrement = false;
                break;
            }

            j += 1;
        }

        if(iIncrement){
            i += 1;
        }
    }

    return hypothesisLst;
}

const checkHypo = (instance, hypothesis) => {
    var idxLabels = [2, 4, 6];
    var idxWords = [9, 11, 12]
    var idxImp = idxLabels.concat(idxWords);

    let same = 0;

    let deadTraits = 0;

    for(let i = 0; i < idxImp.length; i++){
        let feat = hypothesis[idxImp[i]];

        if(feat == -1){
            deadTraits += 1;
            continue;
        }

        let check = false;

        if(idxImp[i] > 6){
            check = hypothesis[idxImp[i]].some(item => instance[idxImp[i]].includes(item))
        } else {
            check = hypothesis[idxImp[i]] === instance[idxImp[i]]
        }

        if(check){
            same += 1;
        } else {
            return 0;
        }
    }

    if(same >= hypothesis.length - deadTraits){
        return 1;
    }
    return 0;
}

export default Igs;