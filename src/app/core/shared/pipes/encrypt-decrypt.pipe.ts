import { Pipe, PipeTransform } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { KEY } from "../objects/constants";

@Pipe({
  name: 'encrypted'
})
export class EncryptPipe implements PipeTransform {
  transform(value: string) {
    if (value) {
      return CryptoJS.AES.encrypt(value, KEY).toString();
    } else {
      return "false";
    }
  }
}

@Pipe({
  name: 'decrypted'
})
export class DecryptPipe implements PipeTransform {
  transform(encrypted: string) {
    if (encrypted) {
      const decrypted = CryptoJS.AES.decrypt(encrypted, KEY);
      return decrypted.toString(CryptoJS.enc.Utf8);
    } else {
      return "false";
    }
  }
}

@Pipe({
  name: 'rmWhiteSpaces'
})
export class RMWhiteSpaces implements PipeTransform {
  transform(text: string) {
    return text.replace(/\s/g, "");
  }
}