class TokenService {
    static setAcessToken = (val) => {
        if(val){
            return localStorage.setItem('@token', val)
        }
        else{
            return localStorage.removeItem('@token')
        }
    }

}

export default TokenService