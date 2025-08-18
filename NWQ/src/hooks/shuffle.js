// src/utils/shuffle.js

export function shuffleArray(array) {
  // 원본 배열을 변경하지 않기 위해 복사본을 생성합니다.
  const newArr = [...array];

  // 배열의 끝에서부터 시작하여 각 요소를 무작위 인덱스와 교환합니다.
  for (let i = newArr.length - 1; i > 0; i--) {
    // 0부터 i까지의 정수 중 랜덤한 인덱스를 선택합니다.
    const j = Math.floor(Math.random() * (i + 1));

    // 현재 인덱스(i)의 값과 랜덤 인덱스(j)의 값을 서로 바꿉니다.
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  // 섞인 배열을 반환합니다.
  return newArr;
}
