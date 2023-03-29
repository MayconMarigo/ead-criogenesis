import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  ChartConfiguration,
  ChartData,
  ChartEvent,
  ChartOptions,
  ChartType,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardService } from 'src/app/service/dashboard.service';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChildren(BaseChartDirective) charts:
    | QueryList<BaseChartDirective>
    | undefined;
  cadastroLabels = [] as any;
  cadastroValues = [] as any;
  reviewsLabels = [] as any;
  reviewsValues = [] as any;
  showTable = false as boolean;
  showType = '' as string;
  cursosEmAndamento = [] as any;
  cursosFinalizados = [] as any;
  types = {
    0: 'Criogênesis',
    1: 'Coren',
    2: 'CRM',
    3: 'CRO',
    4: 'Outros',
  } as any;
  // Pie

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    datasets: {
      pie: {
        backgroundColor: [
          '#daf542',
          '#38d993',
          '#3899d9',
          '#040d3d',
          '#0d3b78',
          '#0d5941',
        ],
        hoverBackgroundColor: [
          '#e0f089',
          '#74d4aa',
          '#5ba4d4',
          '#141d52',
          '#2f4e78',
          '#3c826c',
        ],
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
        },
      },
      datalabels: {
        color: 'white',
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data: any) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + '%';
          return percentage;
        },
      },
    },
  };
  public pieChartOptions2: ChartConfiguration['options'] = {
    responsive: true,
    datasets: {
      pie: {
        backgroundColor: [
          '#040d3d',
          '#0d3b78',
          '#3899d9',
          '#38d993',
          '#daf542',
        ],
        hoverBackgroundColor: [
          '#141d52',
          '#2f4e78',
          '#5ba4d4',
          '#74d4aa',
          '#e0f089',
        ],
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          usePointStyle: true,
        },
      },
      datalabels: {
        color: 'white',
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data: any) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + '%';
          return percentage;
        },
      },
    },
  };
  public pieChartData1: ChartData<'pie', number[], string | string[]> = {
    labels: this.cadastroLabels,
    datasets: [
      {
        data: this.cadastroValues,
      },
    ],
  };
  public pieChartData2: ChartData<'pie', number[], string | string[]> = {
    labels: this.reviewsLabels,
    datasets: [
      {
        data: this.reviewsValues,
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  cadastros = [] as any;
  pendentes = [] as any;

  usuarios = [
    {
      date: '19 Feb 2019',
      punchIn: '10 AM',
      punchOut: '7 PM',
      production: 9,
      break: 1,
      overtime: 2,
    },
    {
      date: '19 Feb 2019',
      punchIn: '10 AM',
      punchOut: '7 PM',
      production: 9,
      break: 1,
      overtime: 2,
    },
    {
      date: '19 Feb 2019',
      punchIn: '10 AM',
      punchOut: '7 PM',
      production: 9,
      break: 1,
      overtime: 2,
    },
    {
      date: '19 Feb 2019',
      punchIn: '10 AM',
      punchOut: '7 PM',
      production: 9,
      break: 1,
      overtime: 2,
    },
    {
      date: '19 Feb 2019',
      punchIn: '10 AM',
      punchOut: '7 PM',
      production: 9,
      break: 1,
      overtime: 2,
    },
    {
      date: '19 Feb 2019',
      punchIn: '10 AM',
      punchOut: '7 PM',
      production: 9,
      break: 1,
      overtime: 2,
    },
  ];

  progressStats = {} as any;

  constructor(
    private dashboardService: DashboardService,
    private userService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.carregarDashboard();
    this.carregarUltimosUsuariosRegistrados();
  }

  carregarUltimosUsuariosRegistrados() {
    this.userService.lastRegisteredUsersAdmin().subscribe((res: any) => {
      res.forEach((r: any) => {
        r.name = r.name.toUpperCase();
        r.type = this.types[r.type];
      });
      this.cadastros = res;
    });
  }
  carregarDashboard() {
    this.dashboardService.getDashboard().subscribe((response: any) => {
      this.cadastroLabels = response.registers.map((e: any) => e.status);
      this.cadastroValues = response.registers.map((e: any) => parseInt(e.qnt));
      const temp = { pessimo: 0, ruim: 0, regular: 0, bom: 0, otimo: 0 };
      response.reviews.forEach((e: any) => {
        if (e.score == 1) {
          temp.pessimo = parseInt(e.qnt);
        } else if (e.score == 2) {
          temp.ruim = parseInt(e.qnt);
        } else if (e.score == 3) {
          temp.regular = parseInt(e.qnt);
        } else if (e.score == 4) {
          temp.bom = parseInt(e.qnt);
        } else if (e.score == 5) {
          temp.otimo = parseInt(e.qnt);
        }
      });
      this.reviewsLabels = ['Ótimo', 'Bom', 'Regular', 'Ruim', 'Péssimo'];
      this.reviewsValues.push(temp.otimo);
      this.reviewsValues.push(temp.bom);
      this.reviewsValues.push(temp.regular);
      this.reviewsValues.push(temp.ruim);
      this.reviewsValues.push(temp.pessimo);
      this.pendentes = response.newPending;

      // console.log(response);
      this.progressStats = response.stats;
      response.courses.map((c: any) => {
        if (c.status == 'Concluído') return this.cursosFinalizados.push(c);

        return this.cursosEmAndamento.push(c);
      });
      setTimeout(() => {
        if (this.charts) {
          this.charts.forEach((child, index) => {
            if (child && child.chart && child.chart.config) {
              if (index == 0) {
                child.chart.config.data.labels = this.cadastroLabels;
                child.chart.config.data.datasets[0].data = this.cadastroValues;
              }
              if (index == 1) {
                child.chart.config.data.labels = this.reviewsLabels;
                child.chart.config.data.datasets[0].data = this.reviewsValues;
              }
              child.chart.update();
            }
          });
        }
      });
    });
  }

  showRegister(type: string) {
    if (!this.showTable) {
      this.showTable = true;
    }
    if (this.showTable && this.showType === type) {
      this.showTable = false;
    }
    if (type !== this.showType) {
      this.showType = type;

      if (!this.showTable) {
        this.showTable = true;
      }
    }
  }
}
