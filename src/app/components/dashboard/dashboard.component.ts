import { Component, OnInit } from '@angular/core';
import { MessageDto } from 'src/app/models/MessageDto';
import {ChatService} from 'src/app/services/chat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private chatService : ChatService) { }

  ngOnInit(): void {
    this.chatService.retrieveMappedObject().subscribe((receiveObj: MessageDto) => {
      this.addToInbox(receiveObj); // call the service method to get the new messages snet
    })
  }

  msgDto: MessageDto = new MessageDto();
  msgInboxArray: MessageDto[] = [];

  send(): void {
    if(this.msgDto) {
      if(this.msgDto.user.length == 0 || this.msgDto.msgText.length == 0){
        alert("Both fields are required.");
        return;
      }
      else {
        this.chatService.broadcastMessage(this.msgDto); // send the message via a service
      }
    }
  }

  addToInbox(obj: MessageDto) {
    let newObj = new MessageDto();
    newObj.user = obj.user;
    newObj.msgText = obj.msgText;
    this.msgInboxArray.push(newObj);
  }
}
