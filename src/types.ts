export interface NewWord {
  hebrew: string;
  translation: string;
  transcription: string;
  partOfSpeech: string;
  gender: string;
  number: string;
  selected: boolean;
}

export interface StoredWord extends NewWord {
  _id: string;
}
