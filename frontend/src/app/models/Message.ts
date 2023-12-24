export interface Message {
  content: string;
  date?: Date;
  contentType: string; // text or image or video
  file?: FormData; // the file it self
}
