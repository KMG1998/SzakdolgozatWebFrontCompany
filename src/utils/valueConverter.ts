function convertClosure(closureType:number): string{
  switch (closureType){
    case 1: return 'teljesítve'
    case 2: return 'sofőr elutasítás'
    case 3: return 'utas lemondás'
    case 4: return 'folyamatban'
    default: return 'ismeretlen'
  }
}

function convertUserType(userType:number): string{
  switch (userType){
    case 1: return 'Rendszer adminisztrátor'
    case 2: return 'Céges adminisztrátor'
    case 3: return 'Magán sofőr'
    case 4: return 'Céges sofőr'
    case 5: return 'Utas'
    default: return 'ismeretlen'
  }
}

export {convertClosure,convertUserType}
