import React from 'react';
import tenimg from '/images/만점이요.png';
import nineimg from '/images/킹갓벽.png';
import eightimg from '/images/짱짱최고.png';
import sevenimg from '/images/완전최고.png';
import siximg from '/images/참잘했어요.png';
import fiveimg from '/images/죄송하지만.png';
import fourimg from '/images/이럴순없소.png';

function ScoreImage({score}) {
   let imageSrc;
   let altText;
   let mentionText;

   if(score === 100) {
      imageSrc = tenimg;
      altText = "tenimg";
      mentionText = "대단해! 엄청나!";
   } else if (score >= 90) {
      imageSrc = nineimg;
      altText = "ninimg";
      mentionText = "킹.갓.벽!";
   } else if (score >= 80) {
      imageSrc = eightimg;
      altText = "eightimg";
      mentionText = "짱! 짱! 최고!";
   } else if (score >= 70) {
      imageSrc = sevenimg;
      altText = "sevenimg";
      mentionText = "와! 완전 최고!!";
   } else if (score >= 60) {
      imageSrc = siximg;
      altText = "siximg";
      mentionText = "참! 잘했어요!!";
   } else if (score >= 50) {
      imageSrc = fiveimg;
      altText = "fiveimg";
      mentionText = "우리 한번 더?";
   } else {
      imageSrc = fourimg;
      altText = "fourimg";
      mentionText = "앗! 아쉬워요";
   }

   return (
      <>
         {/* 텍스트 렌더링 */}
         <div id="mention">{mentionText}</div>

         {/* 이미지 렌더링 */}
         <img className='image' src={imageSrc} alt={altText} />;
      </>
   );
}

export default ScoreImage;