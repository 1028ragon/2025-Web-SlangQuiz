class ScoreScreenDTO {
     constructor(status, message, nickname, score) {
          this.status = status;
          this.message = message;
          this.nickname = nickname;
          this.score = score;
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

export default ScoreScreenDTO;

