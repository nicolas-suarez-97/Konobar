import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { MenuPage } from '../pages/menu/menu';
import { OrdenPage } from '../pages/orden/orden';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AdminPage } from '../pages/admin/admin';
import { CocinaPage } from '../pages/cocina/cocina';
import { PlatosPage } from '../pages/platos/platos';
import { BebidasPage } from '../pages/bebidas/bebidas';
import { PostresPage } from '../pages/postres/postres';
import { SlidesPage } from '../pages/slides/slides';
import { AgregMesaPage } from '../pages/agreg-mesa/agreg-mesa';
import { AgregMenuPage } from '../pages/agreg-menu/agreg-menu';
import { InventarioPage } from '../pages/inventario/inventario';
import { ReportePage } from '../pages/reporte/reporte';
import { AgregarPlatoPage } from '../pages/agregar-plato/agregar-plato';
import { ListaUsuariosPage } from '../pages/lista-usuarios/lista-usuarios';
import { ModificarPlatoPage } from '../pages/modificar-plato/modificar-plato';
import { EditarUsuarioPage } from '../pages/editar-usuario/editar-usuario';
import { InfoPlatoPage } from '../pages/info-plato/info-plato';
import { IonicStorageModule } from '@ionic/storage';
import { VerOrdenPage } from '../pages/ver-orden/ver-orden';
import { AyudaPage } from '../pages/ayuda/ayuda';
import { FacturaPage } from '../pages/factura/factura';
import { FinalPage } from '../pages/final/final';
import { StarRatingModule } from 'ionic3-star-rating';
import { TimelineComponent } from '../components/timeline/timeline';
import { TimelineTimeComponent } from '../components/timeline/timeline';
import { TimelineItemComponent } from '../components/timeline/timeline';
import { LineaTiempoPage } from '../pages/linea-tiempo/linea-tiempo';
import { ChatPage } from '../pages/chat/chat';
import { ChatCocinaPage } from '../pages/chat-cocina/chat-cocina';
import { CalificacionPage } from '../pages/calificacion/calificacion';
import { InfoDiaReportePage } from '../pages/info-dia-reporte/info-dia-reporte';
import { InfoDetalladoReportePage } from '../pages/info-detallado-reporte/info-detallado-reporte';



@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MenuPage,
    OrdenPage,
    LoginPage,
    AdminPage,
    CocinaPage,
    PlatosPage,
    BebidasPage,
    PostresPage,
    SlidesPage,
    AgregMesaPage,
    AgregMenuPage,
    InventarioPage,
    ReportePage,
    AgregarPlatoPage,
    ListaUsuariosPage,
    ModificarPlatoPage,
    EditarUsuarioPage,
    InfoPlatoPage,
    VerOrdenPage,
    AyudaPage,
    FacturaPage,
    FinalPage,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    LineaTiempoPage,
    ChatPage,
    ChatCocinaPage,
    CalificacionPage,
    InfoDiaReportePage,
    InfoDetalladoReportePage
  ],
  imports: [
    BrowserModule,
    StarRatingModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    MenuPage,
    OrdenPage,
    LoginPage,
    AdminPage,
    CocinaPage,
    PlatosPage,
    BebidasPage,
    PostresPage,
    SlidesPage,
    AgregMesaPage,
    AgregMenuPage,
    InventarioPage,
    ReportePage,
    AgregarPlatoPage,
    ListaUsuariosPage,
    ModificarPlatoPage,
    EditarUsuarioPage,
    InfoPlatoPage,
    VerOrdenPage,
    AyudaPage,
    FacturaPage,
    FinalPage,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    LineaTiempoPage,
    ChatPage,
    ChatCocinaPage,
    CalificacionPage,
    InfoDiaReportePage,
    InfoDetalladoReportePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
