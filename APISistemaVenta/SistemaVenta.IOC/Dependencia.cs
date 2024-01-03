using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SistemaVenta.DAL.DBContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using SistemaVenta.DAL.Repositorios.Contrato;
using SistemaVenta.DAL.Repositorios;

using SistemaVenta.Utility;
using SistemaVenta.BLL.Servicios.Contrato;
using SistemaVenta.BLL.Servicios;

namespace SistemaVenta.IOC
{
    public static class Dependencia
    {

        /// <summary>
        /// Inyectar dependencias de la capa DAL (Data Access Layer):
        /// Recibe un objeto de tipo IServiceCollection (método de extensión) y un objeto de tipo IConfiguration.
        /// Dentro del sercio se agrega el contexto de la base de datos, se le pasa la cadena de conexión y se le indica que es SQL Server.
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        public static void InyectarDependencias(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DbventaContext>(options => {
                options.UseSqlServer(configuration.GetConnectionString("cadenaSQL"));
            });

            // Inyectar dependencias de la capa DAL (Data Access Layer):
            services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>)); // Utiliza para un modelo generico
            services.AddScoped<IVentaRepository, VentaRepository>(); // Utiliza para un modelo especifico

            // Inyectar dependencias de la capa Utility con todos los mapeos desde los modelos a los DTO's y viceversa:
            services.AddAutoMapper(typeof(AutoMapperProfile));

            // Inyectar dependencias de la capa BLL (Business Logic Layer):
            services.AddScoped<IRolService, RolService >();
            services.AddScoped<IUsuarioService, UsuarioService >();
            services.AddScoped<ICategoriaService, CategoriaService >();
            services.AddScoped<IProductoService, ProductoService >();
            services.AddScoped<IVentaService, VentaService >();
            services.AddScoped<IDashBoardService, DashBoardService >();
            services.AddScoped<IMenuService, MenuService >();
        }
    }
}
