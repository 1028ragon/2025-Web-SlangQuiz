class testDTO {
   constructor(status, message, nickname, score) { 
         this.status = 1;
         this.message = "대단한걸";
         this.nickname = "이게 뭐지";
         this.score = 80;
      }

   status() { 
      return this.status;
   }

   message() {
      return this.message;
   }

   getUsername() { 
      return this.nickname;
   }

   getScore() {
      return this.score;
   }
}

export default testDTO;

