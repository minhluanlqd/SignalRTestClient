import { Injectable } from '@angular/core';
import {MessageDto} from '../models/MessageDto';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment.prod'; 
import {Observable, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private connection: any = new signalR.HubConnectionBuilder()
                                        .withUrl(`https://localhost:7055/chatsocket`) // to chathub route config in Program.cs
                                        .configureLogging(signalR.LogLevel.Information)
                                        .build();
  readonly POST_URL = `${environment.apiUrl}/chat/send`;
  private receivedMessageObject: MessageDto = new MessageDto();
  private sharedObj = new Subject<MessageDto>();

  constructor(private http: HttpClient) {
    this.connection.onclose(async () => {
      await this.start();
    });
    this.connection.on("ReceiveOne", (user: any, message: any) => {
      this.MapReceiveMessage(user, message);
    });
    this.start();
  }

  public async start() {
    try {
      await this.connection.start();
      console.log("connected");
    }
    catch(err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    }
  }

  private MapReceiveMessage(user: string, message: string): void {
    this.receivedMessageObject.user = user;
    this.receivedMessageObject.msgText = message;
    this.sharedObj.next(this.receivedMessageObject);
  }
  
  // Call the controller method in the backend
  public broadcastMessage(msgDto: any) {
    this.http.post(this.POST_URL, msgDto).subscribe(data => {
      console.log(data);
    })
  }
  
  public retrieveMappedObject(): Observable<MessageDto> {
    return this.sharedObj.asObservable();
  }
}
