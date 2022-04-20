import Word from '../../src/Entity/Word'
import {Unit} from '@/Entity/Unit'

 describe('Exercise Option Test', () => {
     //const word = new Word('A','B','C','D')
     //const unit = new Unit
     //const exercises = word.generateExercises();
     const options = ['', '', '', '']
     const JAPANESE = 1;
     const CHINESE = 2;
     const KANA = 3;
     const questionType = [KANA, CHINESE, JAPANESE]
     //const optionType = [Kana,Chinese,Japanese]
     it('Test if questions are KANA and option type are CHINESE or JAPANESE', () => {
         //let questionType='Chinese'
         let opitionType = [KANA, CHINESE]
         if (questionType == KANA) {
             let i = 0;
             options.forEach((option) => {
                 expect(options[i].type).toBe(options[i + 1].type)
                 expect(option.type).toContain(opitionType)
                 i++;

             })


         }
     })
     it('Test if questions are CHINESE and option type ARE JAPANESE or KANA', () => {
         let opitionType = [JAPANESE, CHINESE]
         if (questionType == CHINESE) {
             let i = 0;
             options.forEach((option) => {
                 expect(options[i].type).toBe(options[i + 1].type)
                 expect(option.type).toContain(opitionType)
                 i++;
             })

         }


     })
 }
 )