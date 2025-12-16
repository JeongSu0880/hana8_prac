// const [isAdding, toggle] =useToggle()

import { useState } from 'react'

export const useToggle = (defVal = false) => {
    const [flag, setFlag] = useState(defVal)
    const toggle = () => setFlag(f => !f)

    return [flag, toggle] as const;
}

//as const는 그냥 쓸 때 타입이 명확하게 보이니까. 튜플로 바꿔주는게 유리하다는 뜻
