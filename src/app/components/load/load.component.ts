import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/service/load/load.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnInit {
  constructor(public loader: LoaderService) {}

  ngOnInit() {}
}
