import { Pipe, PipeTransform } from '@angular/core';
import { HttpUrlEncodingCodec } from "@angular/common/http";

@Pipe({
  name: 'encode'
})
export class EncodePipe implements PipeTransform {
  codec = new HttpUrlEncodingCodec;
  transform(value: any, ...args: any[]): any {
    return this.codec.encodeValue(value);
  }
}

@Pipe({
  name: 'decode'
})
export class DecodePipe implements PipeTransform {
  codec = new HttpUrlEncodingCodec;
  transform(value: any, ...args: any[]): any {
    return this.codec.decodeValue(value);
  }
}