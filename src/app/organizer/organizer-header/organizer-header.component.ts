import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizer-header',
  templateUrl: './organizer-header.component.html',
  styleUrls: ['./organizer-header.component.css']
})
export class OrganizerHeaderComponent implements OnInit {

  constructor(private AuthService: AuthService) { }

  ngOnInit(): void {
  }

  onLogOut(){
    this.AuthService.logout();
  }

}
