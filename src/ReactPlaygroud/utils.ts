export const filenameLanguage=(name:string)=>{
    const suffix=name.split('.').pop()||''
    if(suffix==='tsx'){
        return 'typescript'
    }
    if(suffix==='ts'){
        return 'typescript'
    }
    if(suffix==='jsx'){
        return 'javascript'
    }
    if(suffix==='js'){
        return 'javascript'
    }
    if(suffix==='json'){
        return 'json'
    }
    if(suffix==='css'){
        return 'css'
    }
    return ''
}