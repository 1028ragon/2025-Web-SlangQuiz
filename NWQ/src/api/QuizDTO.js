// src/api/QuizDTO.js

class QuizDTO {
  constructor(quiz_id, quiz_text, image_url, options) {
    this.quiz_id = quiz_id;
    this.quiz_text = quiz_text;
    this.image_url = image_url;
    this.options = options.map(option => ({
      option_id: option.option_id,
      option_text: option.option_text
    }));
  }

  getId() {
    return this.quiz_id;
  }

  getText() {
    return this.quiz_text;
  }

  getImageUrl() {
    return this.image_url;
  }

  getOptions() {
    return this.options;
  }
}

export default QuizDTO;
