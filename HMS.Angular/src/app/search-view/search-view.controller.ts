import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '<path to data service>';
import { ToastrService } from '<path to toastr service>';

@Component({
  selector: 'search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css'],
})
export class SearchViewComponent implements OnInit {
  people: any[];

  constructor(
    private router: Router,
    private dataService: DataService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataService.getPeople().then((resp) => {
      this.people = resp.data;
    });
  }

  loadDetails(personId: number): void {
    if (personId === 6) {
      this.toastrService.error("Hannah always throws this error just to show toastr integration.", "Fake Error!");
      return;
    }
    this.router.navigate(['details', personId]);
  }
}