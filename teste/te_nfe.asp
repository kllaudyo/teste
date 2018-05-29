<%
'Programa    : Nota Fiscal
'Objetivo    : Permitir ao fornecedor emitir suas proprias notas
'Analista    : Rajiv Kapoor
'Programador : Vijay Lopes Kapoor
'
'Criação     : 14/05/2018
%>
<!--#include file="../util/un_util_objetos.asp"-->
<!--#include file="../util/un_util_calculo_dv.asp"-->
<%
in_id_nota_fiscal = 1
%>
<html>
	<head>
		<style>
			@page{
				margin-top: 10mm;
			}
			.fieldLabel{
				font-size: 12px;
			}
			.fieldInput{
				font-size: 10px;
				font-weight: bold;
				padding-left: 0;
			}
			ul{
				list-style: none;
			}
			.footer{
				font-size: 12px;
			}
			img{
				float: left;
				width: 50px;
			}
			strong{
				padding-left: 5px;
			}
			.issqn{
				padding-top: 100px;
			}
			.titulo{
				font-size: 10px;
				font-weight: bold;
				padding-left: 0;
			}
			#entrada_saida{
				float: right;
				margin-right: 20px;
			}
		</style>
	</head>
	<body>
		<center>
			<%
			response.charset = "utf-8"

			function FormatoCnpj(cnpj)
				texto = left(cnpj, 2) & "." & mid(cnpj, 3, 3) & "." & mid(cnpj, 5, 3) & "/" & mid(cnpj, 9, 4) & "-" & right(cnpj, 2)
				FormatoCnpj = texto
			end function

			function FormatoCep(cep)
				texto = left(cep,5) & "-" & mid(cep,6,8)
				FormatoCep = texto
			end function
			
			function FormatoCelular(celular)
				texto = trim(celular)
				texto = replace(texto,"-","")
				texto = replace(texto,"(","")
				texto = replace(texto,")","")

				texto = left(texto,0) & "(" & mid(texto,1,2) & ")" & mid(texto,3,5) & "-" & right(texto,4)

				FormatoCelular = texto
			end function

			Function FormatoChave(chave)
				'tamanho: 44
				for i = 1 to 44 step 4
					texto = texto & " " & mid(chave, i, 4)
				next
				FormatoChave = texto
			End Function

			'-- Informacoes da nota fiscal
			sSql = " select * from VW_NOTA_FISCAL where id_nota_fiscal = " & in_id_nota_fiscal
			set rs_nota = cn_banco.execute(sSql)

			if not rs_nota.eof then
				nr_serie = rs_nota("nr_serie")
				nr_nota_fiscal = rs_nota("nr_nota_fiscal")
				hs_nota_fiscal = rs_nota("hs_nota_fiscal")
				tp_nota_fiscal = rs_nota("tp_nota_fiscal")
				hr_emissao = rs_nota("hr_emissao")
				te_natureza_operacao = rs_nota("te_natureza_operacao")
				dt_emissao = rs_nota("dt_emissao")
				dt_entrada_saida = rs_nota("dt_entrada_saida")
				vl_nota_fiscal = rs_nota("vl_nota_fiscal")
				te_informacao_complementar = rs_nota("te_informacao_complementar")
				te_informacao_fisco = rs_nota("te_informacao_fisco")
			end if
			rs_nota.close
			set rs_nota = nothing

			'-- Informacoes sobre o emitente
			sSql = " select * from VW_EMISSOR_NOTA_FISCAL where id_nota_fiscal = " & in_id_nota_fiscal
			set rs_emitente = cn_banco.execute(sSql)

			if not rs_emitente.eof then
				nr_cgc_emitente = rs_emitente("nr_cgc")
				nm_razao_social_emitente = rs_emitente("nm_razao_social")
				nm_fantasia_emitente = rs_emitente("nm_fantasia")
				te_endereco_emitente = rs_emitente("te_endereco")
				nr_endereco_emitente = rs_emitente("nr_endereco")
				nm_bairro_emitente = rs_emitente("nm_bairro")
				cd_municipio_emitente = rs_emitente("cd_municipio")
				nm_municipio_emitente = rs_emitente("nm_municipio")
				sg_uf_emitente = rs_emitente("sg_uf")
				nr_cep_emitente = rs_emitente("nr_cep")
				cd_pais_emitente = rs_emitente("cd_pais")
				nm_pais_emitente = rs_emitente("nm_pais")
				nr_telefone_emitente = rs_emitente("nr_telefone")
				nr_ie_emitente = rs_emitente("nr_ie")
				nr_ie_st_emitente = rs_emitente("nr_ie_st")
				cd_crt_emitente = rs_emitente("cd_crt")
			end if
			rs_emitente.close
			set rs_emitente = nothing

			'-- Informacoes sobre o destinatario
			sSql = " select * from VW_DESTINATARIO_NOTA_FISCAL where id_nota_fiscal = " & in_id_nota_fiscal
			set rs_dest = cn_banco.execute(sSql)
			if not rs_dest.eof then
				nr_cgc_dest = rs_dest("nr_cgc")
				nm_razao_social_dest = rs_dest("nm_razao_social")
				te_endereco_dest = rs_dest("te_endereco")
				nr_endereco_dest = rs_dest("nr_endereco")
				nm_bairro_dest = rs_dest("nm_bairro")
				cd_municipio_dest = rs_dest("cd_municipio")
				nm_municipio_dest = rs_dest("nm_municipio")
				sg_uf_dest = rs_dest("sg_uf")
				nr_cep_dest = rs_dest("nr_cep")
				cd_pais_dest = rs_dest("cd_pais")
				nm_pais_dest = rs_dest("nm_pais")
				nr_telefone_dest = rs_dest("nr_telefone")
				nr_ie_dest = rs_dest("nr_ie")
				nm_email_dest = rs_dest("nm_email")
				cd_ie_destino = rs_dest("cd_ie_destino")
			end if

			'-- Informacoes sobre o imposto
			sSql = " select * from VW_TOTAIS_NOTA_FISCAL where id_nota_fiscal = " & in_id_nota_fiscal
			set rs_imposto = cn_banco.execute(sSql)

			if not rs_imposto.eof then
				vl_base_calculo = rs_imposto("vl_base_calculo")
				vl_icms = rs_imposto("vl_icms")
				vl_icms_deson = rs_imposto("vl_icms_deson")
				vl_fcp_uf_destinatario = rs_imposto("vl_fcp_uf_destinatario")
				vl_icms_uf_destinatario = rs_imposto("vl_icms_uf_destinatario")
				vl_icms_uf_remetente = rs_imposto("vl_icms_uf_remetente")
				vl_base_calculo_st = rs_imposto("vl_base_calculo_st")
				vl_substituicao_tributaria = rs_imposto("vl_substituicao_tributaria")
				vl_produtos = rs_imposto("vl_produtos")
				vl_frete = rs_imposto("vl_frete")
				vl_seguro = rs_imposto("vl_seguro")
				vl_desconto = rs_imposto("vl_desconto")
				vl_importado = rs_imposto("vl_importado")
				vl_ipi = rs_imposto("vl_ipi")
				vl_pis = rs_imposto("vl_pis")
				vl_confis = rs_imposto("vl_confis")
				vl_outras_despesas = rs_imposto("vl_outras_despesas")
				vl_nota_fiscal = rs_imposto("vl_nota_fiscal")
			end if
			rs_imposto.close
			set rs_imposto = nothing

			'-- Informacoes sobre o transportador
			sSql = " select * from VW_TRANSPORTADORA_NOTA_FISCAL where id_nota_fiscal = " & in_id_nota_fiscal
			set rs_tran = cn_banco.execute(sSql)
			if not rs_tran.eof then
				nr_mod_frete = rs_tran("nr_mod_frete")
				nr_cnpj_tran = rs_tran("nr_cnpj")
				nm_razao_social_tran = rs_tran("nm_razao_social")
				nr_ie_tran = rs_tran("nr_ie")
				te_endereco_tran = rs_tran("te_endereco")
				nm_municipio_tran = rs_tran("nm_municipio")
				sg_uf_tran = rs_tran("sg_uf")
				qt_volume = rs_tran("qt_volume")
				nm_especie = rs_tran("nm_especie")
				vl_peso_liquido = rs_tran("vl_peso_liquido")
				vl_peso_bruto = rs_tran("vl_peso_bruto")
			end if
			%>
			<!-- Cabeçalho -->
			<table border="1" cellPadding="2" cellSpacing="0" width="700">
				<tr>
					<td colspan="2">
						<font size="1">Recebemos de <%=nm_razao_social%> os produtos / serviços constantes da nota fiscal identificado ao lado</font>
					</td>
					<td rowspan="2" width="10%" align="center">
						<font size="2">NF-e</font><br/>
						<font size="2">Nº <%=nr_nota_fiscal%></font>
						<font size="2">Série <%=nr_serie%></font>
					</td>
				</tr>
				<tr>
					<td valign="top" height="50">
						<font size="1">Data de recebimento:</font>
						</td>
					<td valign="top" height="50">
						<font size="1">Identificação e assinatura do recebedor:</font>
					</td>
				</tr>
			</table>
			<hr>
			<!-- Parte do emitente -->
			<table border="1" cellpadding="2" cellspacing="0" width="700">
				<tr>
					<td rowspan="3" width="30%">
						<font size="1">Identificação do emitente:</font>
						<ul class="fieldInput">
							<li><%=nm_razao_social_emitente%></li>
							<li><%=te_endereco_emitente & "," & nr_endereco_emitente%></li>
							<li><%=nm_bairro_emitente%></li>
							<li><%="Cep: " & FormatoCep(nr_cep_emitente)%></li>
							<li><%=nm_municipio_emitente & "/" & sg_uf_emitente%></li>
							<li><%="Fone: "& FormatoCelular(nr_telefone_emitente)%></li>
						</ul>
					</td>
					<td align="left" rowspan="3" width="20%" style="position: relative;">
						<div style="text-align: center">
							<font size="3">DANFE</font><br/>
							<font size="2">Documento auxiliar da nota fiscal eletrônica</font>
						</div>
						<div style="padding-left: 8px">
							<font size="2">0 - Entrada</font><br/>
							<font size="2">1 - Saida</font>
						</div>
						<div style="border: 1px solid; position: absolute; right: 30px; top: 50px; padding: 5px">
							<%=tp_nota_fiscal%>
						</div>
						<div style="padding-left: 8px">
							<font size="2" style="float:left">Nº:</font>
							<font size="2" style="float: right"><%=nr_nota_fiscal%></font>
						</div>
						<br/>
						<div style="padding-left: 8px">
							<font size="2" style="float:left">Série:</font>
							<font size="2" style="float: right"><%=nr_serie%></font>
						</div>
						<br/>
						<div style="text-align: center; font-weight: bold">
								<font size="1">FOLHA 01/01</font>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<strong><font size="1">Chave de acesso</font></strong><br/>
						<strong><font size="2"><%=FormatoChave(mid(hs_nota_fiscal,4))%></font></strong>
					</td>
				</tr>
				<tr>
					<td>
						<font size="2">Consulta de autenticidade no portal nacional da NF-e www.nfe.fazenda.gov.br/portal ou no site da Sefaz Autorizadora</font>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<font size="1">Natureza de operação</font><br/>
						<font size="1"><%=te_natureza_operacao%></font>
					</td>
					<td>
						<font size="1">Protocolo de autorização de uso</font><br/>
						<font size="1"><%=""%></font>
					</td>
				</tr>
				<tr>
					<td>
						<font size="1">Inscrição Estadual</font><br/>
						<font size="1"><%=nr_ie_emitente%></font>
					</td>
					<td nowrap valign="top">
						<font size="1">Inscrição Estadual Do Subst. Trib</font><br/>
						<font size="1"><%=nr_ie_st_emitente%></font>
					</td>
					<td>
						<font size="1">CNPJ</font><br/>
						<font size="1"><%=FormatoCnpj(nr_cgc_emitente)%></font>
					</td>
				</tr>
			</table>
			<!-- Parte do destinatário -->
			<table cellpading="0" cellspacing="0" width="700">
				<tr>
					<td>
						<strong class="titulo"><font size="1">Destinatário/Remetente</font></strong>
					</td>
				</tr>
			</table>
			<table border="1" cellpadding="2" cellspacing="0" width="700">
				<tr>
					<td colspan="4">
						<font size="1">Nome/Razão Social</font><br/>
						<font size="1"><%=nm_razao_social_dest%></font>
					</td>
					<td>
						<font size="1">CNPJ/CPF</font><br/>
						<font size="1"><%=FormatoCnpj(nr_cgc_dest)%></font>
					</td>
					<td>
						<font size="1">Data de emissão</font><br/>
						<font size="1"><%=dt_emissao%></font>
					</td>
				</tr>
				<tr>
					<td colspan="3">
						<font size="1">Endereço</font><br/>
						<font size="1"><%=te_endereco_dest%></font>
					</td>
					<td>
						<font size="1">Bairro/Distrito</font><br/>
						<font size="1"><%=nm_bairro_dest%></font>
					</td>
					<td>
						<font size="1">Cep</font><br/>
						<font size="1"><%=FormatoCep(nr_cep_dest)%></font>
					</td>
					<td>
						<font size="1">Data Saida/Entrada</font><br/>
						<font size="1"><%=dt_entrada_saida%></font>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<font size="1">Municipio</font><br/>
						<font size="1"><%=nm_municipio_dest%></font>
					</td>
					<td>
						<font size="1">Fone/Fax</font><br/>
						<font size="1"><%=nr_telefone_dest%></font>
					</td>
					<td>
						<font size="1">Uf</font><br/>
						<font size="1"><%=sg_uf_dest%></font>
					</td>
					<td>
						<font size="1">Inscrição Estadual</font><br/>
						<font size="1"><%=nr_ie_dest%></font>
					</td>
					<td>
						<font size="1">Hora da saída</font><br/>
						<font size="1"><%=hr_emissao%></font>
					</td>
				</tr>
			</table>
			<!-- Parte da fatura -->
			<table cellpading="0" cellspacing="0" width="700">
				<tr>
					<td>
						<strong class="titulo"><font size="1">Fatura</font></strong>
					</td>
				</tr>
			</table>
			<table border="1" cellpadding="2" cellspacing="0" width="700">
				<%
				sSql = " select rownum i, p.* from VW_PARCELAS_NOTA_FISCAL p where id_nota_fiscal = " & in_id_nota_fiscal
				set rs_fatura = cn_banco.execute(sSql)
				lim = 10

				if not rs_fatura.eof then
					do while not rs_fatura.eof
				%>
						<td>
							<font size="1"><%=("NR_PARCELA")%></font><br/>
							<font size="1"><%=rs_fatura("DT_PARCELA")%></font><br/>
							<font size="1"><%=rs_fatura("VL_PARCELA")%></font><br/>
						</td>
				<%
					if cInt(rs_fatura("i")) mod lim = 0 then
						response.write "</tr><tr>"
					end if
					rs_fatura.movenext
					loop
				end if
				%>
			</table>
			<!-- Parte do imposto -->
			<table cellpading="0" cellspacing="0" width="700">
				<tr>
					<td>
						<strong class="titulo"><font size="1">Cálculo do imposto</font>
					</td>
				</tr>
			</table>
			<table border="1" cellpading="2" cellspacing="0" width="700">
				<tr>
					<td colspan="2">
						<font size="1">Base de cálculo do icms</font><br/>
						<table cellpading="0" cellspacing="0" width="100%">
							<tr>
								<td align="right">
									<font size="1"><%=FormatNumber(vl_base_calculo, 2)%></font>
								</td>
							</tr>
						</table>
					</td>
					<td>
						<font size="1">Valor do icms</font><br/>
						<table cellpading="0" cellspacing="0" width="100%">
							<tr>
								<td align="right">
									<font size="1"><%=FormatNumber(vl_icms, 2)%></font>
								</td>
							</tr>
						</table>
					</td>
					<td>
						<font size="1">Base de calculo do icms substituição</font><br/>
						<table cellpading="0" cellspacing="0" width="100%">
							<tr>
								<td align="right">
									<font size="1"><%=FormatNumber(vl_base_calculo_st, 2)%></font>
								</td>
							</tr>
						</table>
					</td>
					<td>
						<font size="1">Valor do icms substituição</font><br/>
						<table cellpading="0" cellspacing="0" width="100%">
							<tr>
								<td align="right">
									<font size="1"><%=FormatNumber(vl_substituicao_tributaria, 2)%></font>
								</td>
							</tr>
						</table>
					</td>
					<td>
						<font size="1">Valor total dos produtos</font><br/>
						<table cellpading="0" cellspacing="0" width="100%">
							<tr>
								<td align="right">
									<font size="1"><%=FormatNumber(vl_produtos, 2)%></font>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<font size="1">Valor do frete</font><br/>
						<table cellpading="0" cellspacing="0" width="100%">
							<tr>
								<td align="right">
									<font size="1"><%=FormatNumber(vl_frete, 2)%></font>
								</td>
							</tr>
						</table>
					</td>
					<td>
						<font size="1">Valor do seguro</font><br/>
						<table cellpading="0" cellspacing="0" width="100%">
							<tr>
								<td align="right">
									<font size="1"><%=FormatNumber(vl_seguro, 2)%></font>
								</td>
							</tr>
						</table>
					</td>
					<td>
						<font size="1">Desconto</font><br/>
						<table cellpading="0" cellspacing="0" width="100%">
							<tr>
								<td align="right">
									<font size="1"><%=FormatNumber(vl_desconto, 2)%></font>
								</td>
							</tr>
						</table>
					</td>
					<td>
						<font size="1">Outras despesas acessórias</font><br/>
						<table cellpading="0" cellspacing="0" width="100%">
							<tr>
								<td align="right">
									<font size="1"><%=FormatNumber(vl_outras_despesas, 2)%></font>
								</td>
							</tr>
						</table>
					</td>
					<td>
						<font size="1">Valor do ipi</font><br/>
						<table cellpading="0" cellspacing="0" width="100%">
							<tr>
								<td align="right">
									<font size="1"><%=FormatNumber(vl_ipi, 2)%></font>
								</td>
							</tr>
						</table>
					</td>
					<td bgcolor="#D0D0D0">
						<font size="1">Valor total da nota</font><br/>
						<table cellpading="0" cellspacing="0" width="100%">
							<tr>
								<td align="right">
									<font size="1"><%=FormatNumber(vl_nota_fiscal, 2)%></font>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<!-- Parte do transportador -->
			<table cellpading="0" cellspacing="0" width="700">
				<tr>
					<td>
						<strong class="titulo"><font size="1">Transportador/Volumes Transportados</font>
					</td>
				</tr>
			</table>
			<table border="1" cellpading="2" cellspacing="0" width="700">
				<tr>
					<td valign="top">
						<font size="1">Razão Social</font><br/>
						<font size="1"><%=nm_razao_social_tran%></font>
					</td>
					<td valign="top">
						<font size="1">Frete por conta</span><br/>
						<font size="1"><%="0-Emitente"%></font>
					</td>
					<td valign="top">
						<font size="1">Codigo Antt</font><br/>
					</td>
					<td valign="top">
						<font size="1">Placa do veículo</font><br/>
					</td>
					<td valign="top">
						<font size="1">Uf</font><br/>
					</td>
					<td valign="top">
						<font size="1">Cnpj/Cpf</font><br/>
						<font size="1"><%=FormatoCnpj(nr_cnpj_tran)%></font>
					</td>
				</tr>
				<tr>
					<td colspan="3" valign="top" height="30">
						<font size="1">Endereço</font><br/>
						<font size="1"><%=te_endereco_tran%></font>
					</td>
					<td valign="top">
						<font size="1">Municipio</font><br/>
						<font size="1"><%=nm_municipio_tran%></font>
					</td>
					<td valign="top">
						<font size="1">Uf</font><br/>
						<font size="1"><%=sg_uf_tran%></font>
					</td>
					<td valign="top">
						<font size="1">Inscrição Estadual</font><br/>
						<font size="1"><%=nr_ie_tran%></font>
					</td>
				</tr>
				<tr>
					<td valign="top" height="30">
						<font size="1">Quantidade</font><br/>
						<font size="1"><%=qt_volume%></font>
					</td>
					<td valign="top">
						<font size="1">Espécie</font><br/>
						<font size="1"><%=nm_especie%></font>
					</td>
					<td valign="top">
						<font size="1">Marca</span><br/>
					</td>
					<td valign="top">
						<font size="1">Numeração</span><br/>
					</td>
					<td valign="top">
						<font size="1">Peso Bruto</font><br/>
						<font size="1"><%=FormatNumber(vl_peso_bruto, 3)%></font>
					</td>
					<td valign="top">
						<font size="1">Peso Líquido</font><br/>
						<font size="1"><%=FormatNumber(vl_peso_liquido, 3)%></font>
					</td>
				</tr>
			</table>
			<%
			ssSql = " select * from VW_ITENS_NOTA_FISCAL where id_nota_fiscal = " & in_id_nota_fiscal
			set rrs = cn_banco.execute(ssSql)

			if not rrs.eof then
			%>
			<!-- Parte do produto -->
			<table cellpading="0" cellspacing="0" width="700">
				<tr>
					<td>
						<strong  class="titulo"><font size="1">Dados do produto/serviços</font>
					</td>
				</tr>
			</table>
			<table border="1" cellpading="2" cellspacing="0" width="700">
				<thead>
					<tr>
						<th rowspan="2"><font size="1">Cod.prod</font></th>
						<th rowspan="2"><font size="1">Descrição do prod/serv</font></th>
						<th rowspan="2"><font size="1">Ncm/sh</font></th>
						<th rowspan="2"><font size="1">Cst</font></th>
						<th rowspan="2"><font size="1">Cfop</font></th>
						<th rowspan="2"><font size="1">Un.</font></th>
						<th rowspan="2"><font size="1">Quant.</font></th>
						<th rowspan="2"><font size="1">V.Unitário</font></th>
						<th rowspan="2"><font size="1">V.Total</font></th>
						<th rowspan="2"><font size="1">BC.Icms</font></th>
						<th rowspan="2"><font size="1">V.Icms</font></th>
						<th rowspan="2"><font size="1">V.Ipi</font></th>
						<th rowspan="2"><font size="1">A.Icms</font></th>
						<th rowspan="2"><font size="1">A.Ipi</font></th>
					</tr>
				</thead>
				<tbody valign="top">
					<%
					do while not rrs.eof
					%>
					<tr>
						<td align="left"><font size="1"><%=rrs("CD_PECA")%></font></td>
						<td><font size="1"><%=rrs("NM_PECA")%></font></td>
						<td align="center"><font size="1"><%=rrs("CD_NCM")%></font></td>
						<td align="center"><font size="1"><%=rrs("NR_ORIGEM") & rrs("NR_CST")%></font></td>
						<td align="center"><font size="1"><%=rrs("CD_CFOP")%></font></td>
						<td align="left"><font size="1"><%=rrs("NM_UNIDADE")%></font></td>
						<td align="right"><font size="1"><%=FormatNumber(rrs("QT_ITEM"), 2)%></font></td>
						<td align="right"><font size="1"><%=FormatNumber(rrs("VL_ITEM"), 4)%></font></td>
						<td align="right"><font size="1"><%=FormatNumber(rrs("VL_TOTAL"), 2)%></font></td>
						<td align="right"><font size="1"><%=FormatNumber(rrs("VL_BASE_ICMS"), 2)%></font></td>
						<td align="right"><font size="1"><%=FormatNumber(rrs("VL_ICMS"), 2)%></font></td>
						<td align="right"><font size="1"><%=FormatNumber(rrs("VL_IPI"), 2)%></font></td>
						<td align="center"><font size="1"><%=FormatNumber(rrs("VL_PORCENTAGEM_ICMS"), 2)%>%</font></td>
						<td align="center"><font size="1"><%=FormatNumber(rrs("VL_PORCENTAGEM_IPI"), 2)%>%</font></td>
					</tr>
					<%
						rrs.movenext
					loop
					%>
				</tbody>
			</table>
			<%
			end if
			set rrs = nothing
			%>
			<!-- Parte do ISSQN -->
			<!-- <div class="issqn"></div> -->
			<table cellpading="0" cellspacing="0" width="700">
				<tr>
					<td>
						<strong class="titulo"><font size="1">Cálculo do issqn</font>
					</td>
				</tr>
			</table>
			<table border="1" cellpading="2" cellspacing="0" width="700">
				<tr>
					<td>
						<font size="1">Inscrição Municipal</font><br/>
						<font size="1"><%=nr_ie_issqn%></font>
					</td>
					<td>
						<font size="1">Valor total dos serviços</font><br/>
						<table cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td align="right">
									<font size="1"><%=vl_servicos%></font>
								</td>
							</tr>
						</table>
					</td>
					<td>
						<font size="1">Base de calculo do issqn</font><br/>
						<table cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td align="right">
									<font size="1"><%=vl_base_calculo_issqn%></font>
								</td>
							</tr>
						</table>
					</td>
					<td>
						<font size="1">Valor do issqn</font><br/>
						<table cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td align="right">
									<font size="1"><%=vl_issqn%></font>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<!-- Parte dos dados adicionais -->
			<table cellpadding="0" cellspacing="0" width="700">
				<tr>
					<td align="left">
						<strong class="titulo"><font size="1">Dados Adicionais</font>
					</td>
				</tr>
			</table>
			<table border="1" cellpading="10" cellspacing="0" width="700">
				<tr>
					<td height="80" valign="top">
						<font size="1">Informações Adicionais</font><br/>
						<table cellpadding="0" cellspacing="0" width="100%">
								<tr>
									<td align="left">
										<font size="1">Pedido: <%=""%></font></td>
									</td>
								</tr>
								<tr>
									<td align="left">
										<font size="1"><%=te_informacao_fisco%></font></td>
									</td>
								</tr>
								<tr>
									<td align="left">
										<font size="1"><%=te_informacao_complementar%></font></td>
									</td>
								</tr>
							</table>
					</td>
					<td valign="top">
						<font size="1">Reservado ao fisco</font><br/>
					</td>
				</tr>
			</table>
		</center>
	</body>
</html>
<!--#include file="../util/un_descarregar_objetos.asp"-->