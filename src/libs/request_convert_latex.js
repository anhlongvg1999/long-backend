var rp = require('request-promise');
export var ConvertLatex = async function(mml) {
    let answerQuestion = ''
    await rp.post('http://www.wiris.net/demo/editor/mathml2latex', {
       form: {
         mml: mml
       }
     }).then(function (response){
       answerQuestion = response
     }).catch(function (err){
         console.log('Message', err)
     });
    return answerQuestion;
};

export var ConvertMathML = async function(latex) {
    let answerQuestion = ''
    await rp.post('http://www.wiris.net/demo/editor/latex2mathml', {
       form: {
        latex: latex
       }
     }).then(function (response){
       answerQuestion = response
     }).catch(function (err){
         console.log('Message', err)
     });
    return answerQuestion;
};