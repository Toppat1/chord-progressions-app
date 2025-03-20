import './App.css';
import { NewChordButton } from './musicHelpers.js';

export function NewDegreeSection() {

    function numeralRow(numeralList){
        let numeralRowButtons = [];
        numeralList.forEach(numeral => {
            numeralRowButtons.push(<NewChordButton fullNumeral={numeral} />)
        });
        return(<div>{numeralRowButtons}</div>)
    }
    return(
        <div className='degree-section'>

        {numeralRow(['I','ii','iii','IV','V','vi','vii°'])}
        {numeralRow(['i','II','III','iv','v','VI','VII'])}
        {numeralRow(['#Idim','#IIdim','#IIIdim','#IVdim','#Vdim','#VIdim','#VIIdim'])}
        {numeralRow(['#Im7b5','#IIm7b5','#IIIm7b5','#IVm7b5','#Vm7b5','#VIm7b5','#VIIm7b5'])}

        </div>
        // [numeralRow(['I','ii','iii','IV','V','vi','vii°']),
        //    numeralRow(['i','II','III','iv','v','VI','VII']),
        //    numeralRow(['#Idim','#IIdim','#IIIdim','#IVdim','#Vdim','bVI','bVII'])]

    )
}