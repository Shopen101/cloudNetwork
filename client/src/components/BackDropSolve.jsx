import React from 'react'
import CirclLoader from './CircLoader'
function BackDropSolve({ onClick, isLoadData, isErrMsg }) {

    if (isErrMsg) {
        return (
            <div
                className='backBlack'
                onClick={onClick}
            >
                <div className="text__block">
                    <h2>Результат по вашему запросу</h2>
                    <hr />
                    <div className="alltext">
                        <p>{isErrMsg}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            className='backBlack'
            onClick={onClick}
        >
            <div className="text__block">
                <h2>Результат по вашему запросу</h2>
                <hr />
            </div>
        </div>
    )
}

export default BackDropSolve
