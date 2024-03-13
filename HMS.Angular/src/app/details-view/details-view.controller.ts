import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '<path to service>/data.service';

@Component({
  selector: 'details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.css'],
})
export class DetailsViewComponent implements OnInit {
  person: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const personId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.dataService.getPerson(personId).subscribe(
      (resp) => {
        this.person = resp;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}