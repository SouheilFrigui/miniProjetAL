import { Component, OnInit } from '@angular/core';
import { productModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
declare var $:any;
declare var toaster: any;
declare var Toast: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: productModel[] | any ;
  SelectedImg:File=null as any;
  tempID="";
  constructor(private proSer:ProductService) { }

  ngOnInit(): void {
    this.proSer.AllProducts.subscribe(res=>
      {
        this.products=res;
        console.log(this.products);
      }
      );
  }

  search(input:any){
      this.proSer.getFromDb(input);
  }
 
  onSelect(event:any){
    var tmppath= URL.createObjectURL(event.target.files[0]);
    $("#AddEmpImg").fadeIn("fast").attr('src',tmppath);
    this.SelectedImg=<File>event.target.files[0];
  }

  add(){
    var message;
    const fd=new FormData();
    fd.append('image',this.SelectedImg);
    fd.append('name',$("#name").val());
    fd.append('category',$("#category").val());
    fd.append('brand',$("#brand").val());
    fd.append('price',$("#price").val());
    fd.append('desc',$("#desc").val());
    this.proSer.add(fd).subscribe(
      res=>{
        message=res;
        Toast.fire({
          type:"success",
          title:message
        });
        this.proSer.getFromDb("");
      },
      error=>{error.error.error.forEach((element: any)=>{toaster.error("Error", element);});
      });
      window.location.reload();
  }

  selectToUpdate(id:any){
    this.tempID=id;
      this.products.forEach(element => {
        if(id==element.id)
        {
          $("#uname").prop("value", element.name)
          $("#oldCategory").prop("value", element.category)
          $("#oldCategory").html(element.category)
          $("#oldBrand").prop("value", element.brand)
          $("#oldBrand").html(element.brand)
          $("#uprice").prop("value", element.price)
          $("#uprice").html(element.price)
          $("#udesc").prop("value", element.desc)
        }
      });
  }

  selectToShow(id:any){
    this.tempID=id;
      this.products.forEach(element => {
        if(id==element.id)
        {
          $("#sname").prop("value", element.name)
          $("#SoldCategory").html(element.category)
          $("#SoldCategory").prop("value", element.category)
          $("#SoldBrand").html(element.brand)
          $("#SoldBrand").prop("value", element.brand)
          $("#sprice").prop("value", element.price)
          $("#sdesc").prop("value", element.desc)
        }
      });
  }

  update(){
    var message;
    const fd=new FormData();
    fd.append('id',this.tempID);
    fd.append('name',$("#uname").val());
    fd.append('category',$("#ucategory").val());
    fd.append('brand',$("#ubrand").val());
    fd.append('price',$("#uprice").val());
    fd.append('desc',$("#udesc").val());
    this.proSer.update(fd).subscribe(
      res=>{
        message=res;
        Toast.fire({
          type:"success",
          title:message
        });
        this.proSer.getFromDb("");
      },
      error=>{error.error.error.forEach((element: any)=>{toaster.error("Error", element);});
      });
      window.location.reload();
  }

  selectToDelete(id){
    this.tempID=id;
  }

  delete()
  {
    var message;
    this.proSer.delete(this.tempID).subscribe(
      res=>{
        message=res;
        Toast.fire({
          type:"success",
          title:message
        });
        this.proSer.getFromDb("");
      },
      error=>{error.error.error.forEach((element: any)=>{toaster.error("Error", element);});
      });
      window.location.reload();
  }
}
